const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const getMaxLikes = (blogs) => {
        return blogs.reduce((max, blog) => blog.likes > max ? blog.likes : max, blogs[0].likes)
    }

    const maxLikes = getMaxLikes(blogs)
    
    for (let i = 0; i < blogs.length; i++) {
        if(blogs[i].likes == maxLikes) {
            const resBlog = {
                title: blogs[i].title,
                author: blogs[i].author,
                likes: blogs[i].likes
            }
            return resBlog
        }
    }
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog
}