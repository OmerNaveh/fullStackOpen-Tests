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