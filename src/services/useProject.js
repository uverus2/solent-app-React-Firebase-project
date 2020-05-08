export default function useProject(fStore) {

    const ref = fStore().collection("projects");

    const createProject = (comment) => ref.add(comment);
    //orderBy("date", "asc")
    const readProjects = () => ref.get();

    const readSingleProject = (projectID) => ref.doc(projectID).get();

    const userStatus = (projectID, data) => ref.doc(projectID).collection("status").add(data);

    const searchProjectsByRole = (role) => ref.where("roles", "array-contains-any", [`${role}`]).get();

    const userStatusUpdate = (projectID, userID, status) => ref.doc(projectID).collection("status").where("userID", "==", `${userID}`).get().then(res => {
        let values = {};
        res.forEach(element => values = { id: element.id, ...element.data() });
        console.log(values);
        ref.doc(projectID).collection("status").doc(values.id).update({ status: status });
    }).catch(e => {
        console.log(e)
    });

    const removeUserRole = (userID, projectID) => ref.doc(projectID).collection("roles").where("userID", "==", `${userID}`).get().then(res => {
        let values = {};
        console.log(res)
        res.forEach(element => values = { id: element.id, ...element.data() });
        console.log(values)
        ref.doc(projectID).collection("roles").doc(values.id).delete();
    }).catch(e => {
        console.log(e);
    });
    const removeUser = async(projectID, userID) => {
        try {
            await userStatusUpdate(projectID, userID, "reject");
            await ref.doc(projectID).update({ users: fStore.FieldValue.arrayRemove(userID) });
            await removeUserRole(userID, projectID);
        } catch (e) {
            console.log(e)
        }
    }

    const getUserStatus = (projectID, userID) => ref.doc(projectID).collection("status").where("userID", "==", `${userID}`).get();

    const getAwaitingUsers = (projectID) => ref.doc(projectID).collection("status").where("status", "==", "awaiting").get();

    const getAcceptedUsers = (projectID) => ref.doc(projectID).collection("status").where("status", "==", "accept").get();

    const getProjectRoles = (projectID) => ref.doc(projectID).collection("roles").get();

    const addUserToRole = (projectID, data) => ref.doc(projectID).collection("roles").add(data);

    const insertUserToProject = (projectID, userID) => ref.doc(projectID).update({ users: fStore.FieldValue.arrayUnion(userID) });


    return { createProject, getAcceptedUsers, removeUser, readProjects, getProjectRoles, searchProjectsByRole, addUserToRole, insertUserToProject, readSingleProject, userStatusUpdate, getAwaitingUsers, userStatus, getUserStatus };

}