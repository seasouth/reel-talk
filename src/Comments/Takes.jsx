import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { axiosGet, axiosTMDBGet } from '../hooks/useAxios';
import Take from './Take';
import Comment from './Comment';

import './Comments.css';

const Takes = ({
    auth
}) => {
    const [comments, setComments] = useState([]);
    const [logo, setLogo] = useState("");

    const navigate = useNavigate();
    const { mediatype, itemid } = useParams();

    useEffect(() => {
        axiosGet(`/thread/thread/${itemid}`).then((response) => {
            console.log(response);
            setComments(orderComments(response.data, null));
        });
        axiosTMDBGet(`${mediatype}/${itemid}/images`).then((response) => {
            setLogo(response?.data?.logos.filter((item) => item.iso_639_1 === 'en').sort((a, b) => a.vote_average < b.vote_average)[0].file_path);
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

    const orderComments = (list) => {
        let orderedComments = [];

        const nestedOrderComments = (nestedList, indentations) => {
            nestedList.sort((a, b) => a.rating - b.rating).forEach((comment) => {
                let updatedComment = comment;
                updatedComment = { ...updatedComment, numIndentations: indentations}

                orderedComments.push(updatedComment);

                nestedOrderComments(list.filter((nestedComment) => nestedComment.parentId === comment.commentId), indentations + 1);
            })
        }

        list.filter((comment) => !comment.parentId).sort((a, b) => a.rating - b.rating).forEach((comment) => {
            let updatedComment = comment;
            updatedComment = { ...updatedComment, numIndentations: 0}

            orderedComments.push(updatedComment);

            nestedOrderComments(list.filter((nestedComment) => nestedComment.parentId === comment.commentId), 1);
        });

        console.log(orderedComments);

        return orderedComments;
    }

    return (
        <div>
            <button 
                className='btn-close'
                onClick={() => navigate('/')}
            />{
            logo &&
            <img
                style={{maxHeight: '30vh', maxWidth: '100%'}}
                src={`https://image.tmdb.org/t/p/original/${logo}`}
                alt={'Thread header'}
            />}
            <hr />
            <h4 className='comments-header'>Comments: </h4>
            <br />
            {comments.length === 0 ?
                <Take
                    className="new-comment"
                    username={auth.username}
                    parentId={null}
                    openReply
                    itemId={itemid}
                    threadType={mediatype}
                    onSubmit={updateComments}
                />
                :
                <React.Fragment>
                    {
                        comments.map((comment) => 
                            <Comment
                                key={comment}
                                details={comment}
                                numIndentations={comment.numIndentations}
                                username={auth.username}
                                commentText={comment.commentText}
                                itemid={itemid}
                                updateComments={updateComments}
                            />
                        )
                    }
                </React.Fragment>
            }
            <br />
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Takes);