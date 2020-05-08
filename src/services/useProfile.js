export default function useProfile(fStore) {
    const ref = fStore().collection("users");

    const readUserProfile = (userID) => ref.where("id", "==", `${userID}`).get();


    return { readUserProfile }
}