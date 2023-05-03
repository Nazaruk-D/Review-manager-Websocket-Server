const {supabase} = require("../supabase/supabase");

async function createComment(review_id, author_id, body ) {
    const { data, error } = await supabase
        .from('comments')
        .insert([{ review_id, author_id, body }])

    if (error) {
        console.log(error);
        return null;
    }

    return data
}

module.exports = {createComment}

