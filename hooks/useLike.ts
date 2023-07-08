import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { toast } from "react-hot-toast";
import axios from "axios";

const useLike = ({userId, postId}: {postId: string, userId?: string}) => {
    const { data: currentUser} = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId)
    const { mutate: mutateFetchedPosts } = usePosts(userId)

    const loginModal = useLoginModal();

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds || []

        return list.includes(currentUser?.id);
    }, [currentUser?.id, fetchedPost?.likedIds])

    const toggleLike = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen()
        }

        try {
            let request;

            if (hasLiked) {
                request = () => axios.delete('/artixx/like', {data: { postId }} )
            } else {
                request = () => axios.post('/artixx/like', { postId })
            }

            await request();
            mutateFetchedPost();
            mutateFetchedPosts();

            toast.success("Success liked")
        } catch (e) {
            toast.error("Something went wrong")
        }
    }, [currentUser, hasLiked, postId, mutateFetchedPost, mutateFetchedPosts, loginModal])

    return { hasLiked, toggleLike }
}

export default useLike;