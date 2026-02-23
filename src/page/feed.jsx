import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Heart, Trash2, UploadCloud, Image as ImageIcon, Loader2 } from 'lucide-react';
import insforge from '../insforge';
import { formatDistanceToNow } from 'date-fns';

export default function Feed() {
    const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'my-photos'
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [caption, setCaption] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (e) {
                console.error("Error parsing user from localStorage:", e);
            }
        }
    }, []);

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, user]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const { data, error } = await insforge.database
                .from('posts')
                .select('*, likes(id, user_id)')
                .order('created_at', { ascending: false });

            if (error) throw error;

            let fetchedPosts = data || [];
            if (activeTab === 'my-photos' && user) {
                fetchedPosts = fetchedPosts.filter(post => post.user_id === user.id);
            }

            setPosts(fetchedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (acceptedFiles) => {
        if (!user) {
            alert("Please log in to upload photos.");
            return;
        }

        const file = acceptedFiles[0];
        if (!file) return;

        setUploading(true);
        try {
            // Upload to storage
            const { data: uploadData, error: uploadError } = await insforge.storage
                .from('images')
                .uploadAuto(file);

            if (uploadError) throw uploadError;

            // Save to database
            const { error: dbError } = await insforge.database
                .from('posts')
                .insert({
                    user_id: user.id,
                    image_url: uploadData.url,
                    image_key: uploadData.key,
                    caption: caption.trim()
                });

            if (dbError) throw dbError;

            setCaption('');
            fetchPosts(); // Reload posts
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert("Failed to upload photo.");
        } finally {
            setUploading(false);
        }
    };

    const toggleLike = async (postId, hasLiked) => {
        if (!user) {
            alert("Please log in to like photos.");
            return;
        }

        try {
            // Optimistic update
            setPosts(prevPosts => prevPosts.map(post => {
                if (post.id === postId) {
                    const newLikes = hasLiked
                        ? post.likes.filter(l => l.user_id !== user.id)
                        : [...(post.likes || []), { id: 'temp', user_id: user.id }];
                    return { ...post, likes: newLikes };
                }
                return post;
            }));

            if (hasLiked) {
                await insforge.database
                    .from('likes')
                    .delete()
                    .eq('post_id', postId)
                    .eq('user_id', user.id);
            } else {
                await insforge.database
                    .from('likes')
                    .insert({
                        post_id: postId,
                        user_id: user.id
                    });
            }

            // Re-fetch to guarantee sync, optional but good if db fails
            // fetchPosts();
        } catch (error) {
            console.error("Error toggling like:", error);
            fetchPosts(); // Rollback on error
        }
    };

    const deletePost = async (postId, imageKey) => {
        if (!user) return;

        if (!window.confirm("Are you sure you want to delete this photo?")) return;

        try {
            // Delete from storage
            if (imageKey) {
                await insforge.storage.from('images').remove(imageKey);
            }

            // Delete from database
            await insforge.database
                .from('posts')
                .delete()
                .eq('id', postId)
                .eq('user_id', user.id);

            setPosts(prev => prev.filter(p => p.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete photo.");
        }
    };

    const onDrop = useCallback(acceptedFiles => {
        handleUpload(acceptedFiles);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, caption]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
        },
        maxFiles: 1,
        disabled: uploading
    });

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center mb-8">
                InstaForge
            </h1>

            {/* Upload Section */}
            {user && (
                <div className="mb-12 bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <UploadCloud className="text-purple-600" /> Upload New Photo
                    </h2>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Write a caption... (optional)"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium text-gray-700 placeholder-gray-400"
                        />
                    </div>

                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${isDragActive
                                ? 'border-purple-500 bg-purple-50 scale-105'
                                : 'border-gray-200 hover:border-purple-400 hover:bg-gray-50'
                            } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <input {...getInputProps()} />
                        {uploading ? (
                            <div className="flex flex-col items-center text-purple-600">
                                <Loader2 className="w-12 h-12 mb-4 animate-spin" />
                                <p className="font-bold">Uploading your masterpiece...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-500">
                                <ImageIcon className="w-12 h-12 mb-4 text-gray-300" />
                                {isDragActive ? (
                                    <p className="font-bold text-purple-600 text-lg">Drop image here...</p>
                                ) : (
                                    <>
                                        <p className="font-bold text-lg text-gray-700">Drag & drop an image here</p>
                                        <p className="text-sm mt-1">or click to select file</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1 rounded-full inline-flex">
                    <button
                        onClick={() => setActiveTab('feed')}
                        className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${activeTab === 'feed' ? 'bg-white shadow-md text-purple-600' : 'text-gray-500 hover:text-gray-800'
                            }`}
                    >
                        Global Feed
                    </button>
                    {user && (
                        <button
                            onClick={() => setActiveTab('my-photos')}
                            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${activeTab === 'my-photos' ? 'bg-white shadow-md text-pink-600' : 'text-gray-500 hover:text-gray-800'
                                }`}
                        >
                            My Photos
                        </button>
                    )}
                </div>
            </div>

            {/* Posts Feed */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <ImageIcon className="w-16 h-16 mx-auto text-gray-200 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800">No photos yet</h3>
                    <p className="text-gray-500 mt-2">
                        {activeTab === 'my-photos' ? "You haven't uploaded any photos yet." : "Be the first to upload a photo!"}
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {posts.map(post => {
                        const likes = post.likes || [];
                        const hasLiked = user ? likes.some(l => l.user_id === user.id) : false;
                        const isOwner = user && post.user_id === user.id;

                        return (
                            <div key={post.id} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                {/* Post Header */}
                                <div className="p-4 flex justify-between items-center border-b border-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                                            {post.user_id.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">User {post.user_id.substring(0, 6)}</p>
                                            <p className="text-xs text-gray-500">
                                                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                    {isOwner && activeTab === 'my-photos' && (
                                        <button
                                            onClick={() => deletePost(post.id, post.image_key)}
                                            className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                                            title="Delete post"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>

                                {/* Post Image */}
                                <div className="w-full bg-gray-100 flex justify-center overflow-hidden max-h-[600px]">
                                    <img
                                        src={post.image_url}
                                        alt={post.caption || 'Post'}
                                        className="w-full h-auto object-contain"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Post Actions */}
                                <div className="p-5">
                                    <div className="flex items-center gap-4 mb-3">
                                        <button
                                            onClick={() => toggleLike(post.id, hasLiked)}
                                            className="group flex items-center gap-2 focus:outline-none"
                                        >
                                            <div className={`p-2 rounded-full group-hover:bg-red-50 transition-colors ${hasLiked ? 'text-red-500' : 'text-gray-400'}`}>
                                                <Heart
                                                    className={`w-7 h-7 transition-all ${hasLiked ? 'fill-current scale-110' : 'group-hover:text-red-400 group-hover:scale-105'}`}
                                                />
                                            </div>
                                            <span className="font-bold text-gray-700 text-lg">
                                                {likes.length} <span className="text-gray-500 font-medium text-sm">likes</span>
                                            </span>
                                        </button>
                                    </div>

                                    {/* Caption */}
                                    {post.caption && (
                                        <div className="mt-2 text-gray-800">
                                            <span className="font-bold mr-2 text-gray-900">User {post.user_id.substring(0, 6)}</span>
                                            <span className="leading-relaxed">{post.caption}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
