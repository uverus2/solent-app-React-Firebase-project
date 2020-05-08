export default function useComments(fStore) {

    const ref = fStore().collection("projects");

    const addComment = (projectID, data) => ref.doc(projectID).collection("comments").add(data);

    const allComments = (projectID) => ref.doc(projectID).collection("comments").get();

    const commentsAdded = (projectID, cb) => {
        ref.doc(projectID).collection("comments").orderBy("time", "asc").onSnapshot(doc => cb(doc));
    }

    // realTimeComments = () => 

    return { addComment, allComments, commentsAdded }
}