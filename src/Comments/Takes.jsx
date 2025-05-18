import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { axiosGet, axiosTMDBGet } from '../hooks/useAxios';
import Take from './Take';
import Comment from './Comment';

import styles from '../styles/Comments.module.css'

const Takes = () => {
    const [replyToOpen, setReplyToOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [logo, setLogo] = useState("");
    const [backdrop, setBackdrop] = useState("");

    const navigate = useNavigate();
    const { mediatype, itemid } = useParams();

    useEffect(() => {
        axiosGet(`/thread/thread/${itemid}`).then((response) => {
            console.log(response);
            const commentsUpdated = [];
            response.data.forEach((item) => {
                commentsUpdated.push({...item, collapsed: false});
            })
            setComments(orderComments(commentsUpdated, null));
        });
        axiosTMDBGet(`${mediatype}/${itemid}/images`).then((response) => {
            const results = response?.data;
            const logo = response?.data?.logos.filter((item) => item.iso_639_1 === 'en').sort((a, b) => a.vote_average < b.vote_average)[0]?.file_path;
            const backdrop = response?.data?.backdrops.sort((a, b) => a.vote_average < b.vote_average)[0]?.file_path;
            const poster = response?.data?.posters.sort((a, b) => a.vote_average < b.vote_average)[0]?.file_path;
            console.log(results);
            const finalPic = logo ? logo : backdrop ? backdrop : poster ? poster : null;
            if (finalPic == null) {

            }
            setLogo(finalPic);
            setBackdrop(backdrop);
        });
        axiosGet(`/thread/rating/${itemid}`).then((response) => {
            console.log("Ratings returned: " + response);
        });
    }, []);

    const updateComments = () => {
        axiosGet(`/comment/thread/${itemid}`).then((response) => {
            console.log(response);
            setComments(orderComments(response.data, null));
        });
    }

    const updateRating = async () => {
        const retValue = await fetch(`/api/get/comment/${mediatype}/${itemid}`)
        const updatedComments = retValue.json();
        setComments(await updatedComments);
    }

    const adjustChildren = (item) => {
        console.log(item);
    }

    const orderComments = (list) => {
        let orderedComments = [];

        const nestedOrderComments = (nestedList, indentations) => {
            nestedList.sort((a, b) => b.rating - a.rating).forEach((comment) => {
                let updatedComment = comment;
                updatedComment = { ...updatedComment, numIndentations: indentations}
                orderedComments.push(updatedComment);
                nestedOrderComments(list.filter((nestedComment) => nestedComment.parentId === comment.commentId && !comment.collapsed), indentations + 1);
            })
        }

        list.filter((comment) => !comment.parentId).sort((a, b) => b.rating - a.rating).forEach((comment) => {
            let updatedComment = comment;
            console.log(updatedComment);
            updatedComment = { ...updatedComment, numIndentations: 0}
            orderedComments.push(updatedComment);
            nestedOrderComments(list.filter((nestedComment) => nestedComment.parentId === comment.commentId && !comment.collapsed), 1);
        });

        return orderedComments;
    }

    const handleOnReplyButton = (e) => {
        setReplyToOpen(true);
    }

    return (
        <div
            className={styles.container}
        >
            <IconButton 
                aria-label="close" 
                size="large"
                onClick={() => navigate('/')}
                sx={{ display: 'flex' }}
            >
                <CancelRoundedIcon fontSize="inherit" sx={{color: 'whitesmoke'}} />
            </IconButton>
            {
                backdrop &&

                <div
                    className={styles.backdropContainer}
                >
                    <img
                        className={styles.backdropOverlay}
                        src={`https://image.tmdb.org/t/p/original/${backdrop}`}
                        alt="Thread header"
                    />
                </div>

                // <div
                //     className={styles.backdropContainer}
                // >
                //     <img
                //         className={styles.backdropImage}
                //         src={`https://image.tmdb.org/t/p/original/${backdrop}`}
                //         alt={'Thread header'}
                //     />
                //     <div className={styles.testOverlay}></div>
                // </div>
                // <div
                //     className={styles.gradientOverlay}
                //     //style={{ maxWidth: '100%', alignItems: 'center' }}
                // >
                //     <img
                //         style={{ maxWidth: '100%' }}
                //         src={`https://image.tmdb.org/t/p/original/${backdrop}`}
                //         alt={'Thread header'}
                //     />
                // </div>
            }
            <hr />
            <div
                className={styles.content}
            >
                <h1 className={styles.commentsHeader}>Comments: </h1>
                <Take
                    className={styles.newComment}
                    parentId={null}
                    openReply
                    itemId={itemid}
                    threadType={mediatype}
                    onSubmit={updateComments}
                    topLevel={true}
                />
                <div style={{paddingTop: '1.5rem'}}>
                {
                    comments.map((comment) =>
                        <Comment
                            key={comment.id}
                            details={comment}
                            numIndentations={comment.numIndentations}
                            commentText={comment.commentText}
                            onReplyButton={handleOnReplyButton}
                            itemid={itemid}
                            threadtype={mediatype}
                            updateComments={updateComments}
                            updateRating={updateRating}
                            adjustChildren={adjustChildren}
                        />
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default Takes;