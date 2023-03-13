import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import StarRating from './StarRating';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Take from './Take';

import './Comments.css';

const Comment = ({
    auth,
    details,
    username,
    commentText,
    itemid,
    updateComments
}) => {
    const [replyToOpen, setReplyToOpen] = useState(false);

    const handleOnClick = (e) => {
        setReplyToOpen(replyToOpen ? false : true);
    }

    const handleOnReplyButton = (e) => {
        setReplyToOpen(true);
    }

    const handleOnSubmit = () => {
        setReplyToOpen(false);
        updateComments();
    }

    useEffect(() => {
        console.log(details);
    }, [details]);

    return (
        <div
            style={{display: 'flex'}}
        >
            { 
                <div
                    style={{display: 'flex'}}
                >{
                    [...Array(details.numIndentations)].map(() =>
                        <div style={{width: '1.5rem'}}>{
                            <div className='thread-line' />
                        }</div>
                    )
                }</div>

            }
            <div className='comment'>
                <div className='comment-inner'>
                    { username ? 
                    <div className='comment-author'>
                        {username}
                    </div>
                    :
                    <div className='comment-heading'>
                        <AccountCircleIcon 
                            sx={{color: 'khaki'}}
                        />
                        <div className='comment-author'>Anonymous</div>
                    </div>}
                    <div className='comment-text'>
                        {commentText}
                    </div>
                    <div className='comment-menu'>
                        <StarRating />
                        <br />
                        <div 
                            style={{padding: '2px'}} 
                        >
                            <Button
                                onClick={handleOnClick}
                                color="primary"
                            >
                                Reply
                            </Button>
                        </div>
                    </div>
                </div>
                {
                    replyToOpen &&
                    <Take
                        className="new-comment"
                        username={auth.username}
                        parentId={details.commentId}
                        openReply={replyToOpen}
                        onSubmit={handleOnSubmit}
                        itemId={itemid}
                        handleOnReplyButton={handleOnReplyButton}
                    />
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Comment);