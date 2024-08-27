import Comments from "../models/Comments.js";

export const createComment = async (req, res) => {
  const blogPostId = req.params.id; // recupero l'id del blogPost
  const commentInfo = req.body; // recupero i dati del commento
  try {
    const newComment = new Comments({ ...commentInfo, blogPost: blogPostId }); // non possiamo solo passare comment info perchè non ha tutti i dati che ci servono, quindi passiamo tutto ciò che sta nel body e aggiungiamo anche l'id del blogPost
    const createdComment = await newComment.save(); //
    return res.send({ data: createdComment });
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
};

export const readAllComments = async (req, res) => {
  try {
    const allComments = await Comments.find({ blogPost: req.params.id }).populate("blogPost",["title"]); // usiamo populate per vedere anche il blogpost oltre al commento
    return res.send({ data: allComments });
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
};

export const readOneComment = async (req,res)=>{
  const id = req.params.id
  try {
    const comment = await Comments.findById(id).populate("blogPost",["title"])
    return res.send({data:comment})
  } catch (error) {
    res.status(400).send({error:"something went wrong"})
  }
}

export const updateComment = async (req, res) => {
  const id = req.params.id;
  const dataToModify = req.body;
  try {
    const updatedComment = await Comments.findByIdAndUpdate(id, dataToModify, {
      new: true,
    });
    return res.send({ data: updatedComment });
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
};

export const deleteComment = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedComment = await Comments.findByIdAndDelete(id);
    return res.send({ data: deletedComment });
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
}
