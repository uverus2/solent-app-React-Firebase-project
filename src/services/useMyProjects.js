export default function useMyProject(fStore) {
    const ref = fStore().collection("projects");

    const readCreatedProjects = (userID) => ref.where("owner", "==", `${userID}`).get();

    const readJoinedProjects = (userID) => ref.where("users", "array-contains-any", [`${userID}`]).get();


    return { readCreatedProjects, readJoinedProjects }

}