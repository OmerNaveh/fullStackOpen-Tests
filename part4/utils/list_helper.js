exports.dummy = (blogs)=>{
    return 1;
}

exports.totalLikes = (blogs)=>{
    let likes = 0;
    for (const blog of blogs) {
       likes += blog.likes
    }
    return likes;
}

exports.favoriteBlog = (blogs)=>{
    let maxBlog={likes:0};
    for(let blog of blogs){
        if(blog.likes>maxBlog.likes){
            maxBlog=blog
        }
    }
    return maxBlog
}