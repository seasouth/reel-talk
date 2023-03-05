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
    const [replyToOpen, setReplyToOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [logo, setLogo] = useState("");
    const [newTake, setNewTake] = useState(false);


    const navigate = useNavigate();
    const { mediatype, itemid } = useParams();

    useEffect(() => {
        setReplyToOpen(false);
        axiosGet(`comment/thread/${itemid}`).then((response) => {
            console.log(response);
            setComments(orderComments(response.data, null));
        });
        axiosTMDBGet(`${mediatype}/${itemid}/images`).then((response) => {
            setLogo(response?.data?.logos[0]?.file_path);
        });
    }, []);

    const updateComments = () => {
        axiosGet(`comment/thread/${itemid}`).then((response) => {
            console.log(response);
            setComments(orderComments(response.data, null));
        });
    }

    const orderComments = (list) => {
        let orderedComments = [];

        const nestedOrderComments = (nestedList, indentations) => {
            console.log(nestedList);
            console.log(indentations);

            nestedList.sort((a, b) => a.rating - b.rating).map((comment) => {
                let updatedComment = comment;
                updatedComment = { ...updatedComment, numIndentations: indentations}

                orderedComments.push(updatedComment);

                nestedOrderComments(list.filter((nestedComment) => nestedComment.parentId === comment.commentId), indentations + 1);
            })
        }

        list.filter((comment) => !comment.parentId).sort((a, b) => a.rating - b.rating).map((comment) => {
            let updatedComment = comment;
            updatedComment = { ...updatedComment, numIndentations: 0}

            orderedComments.push(updatedComment);

            nestedOrderComments(list.filter((nestedComment) => nestedComment.parentId === comment.commentId), 1);
        });

        console.log(orderedComments);

        return orderedComments;
    }

    const handleOnReplyButton = (e) => {
        console.log(itemid);
        console.log(replyToOpen);
        setReplyToOpen(true);
    }

    return (
        <div>
            <button 
                className="btn-close"
                onClick={() => navigate('/')}
            />
            <h4 className='comments-header'>Comments: </h4>
            <img
                style={{width: '100%'}}
                src={`https://image.tmdb.org/t/p/original/${logo}`}
            />
            <hr />
            {comments.length === 0 ?
                <Take
                    className="new-comment"
                    username={auth.username}
                    parentId={null}
                    openReply
                    itemId={itemid}
                    updateComments
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
                                onReplyButton={handleOnReplyButton}
                                itemid={itemid}
                                updateComments={updateComments}
                            />
                        )
                    }
                </React.Fragment>
            }
            <hr />
            <br />
            <div 
                style={{padding: '2px'}} 
            >
                <button
                    className='btn btn-outline-light btn-sm'
                    onClick={() => setNewTake(true)}
                >
                    Reply
                </button>
            </div>
            <br />
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Takes);