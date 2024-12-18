import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import './Comments.css';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import StarRating from './StarRating';
import { axiosPost } from '../hooks/useAxios';

const Take = ({
    parentId = "",
    openReply,
    itemId = "",
    threadType,
    onSubmit
}) => {
    const [text, setText] = useState("");
    const [mediaRating, setMediaRating] = useState(0);

    useEffect(() => {
        console.log(mediaRating);
    }, [mediaRating]);

    const submitComment = () => {
        let comment = {
            commenter: "Anonymous",
            commentText: text,
            threadId: itemId,
            parentId: parentId,
            threadType: threadType,
            mediaRating: mediaRating
        }
        console.log(comment);
        axiosPost('/comment/save', comment).then((response) => {
            console.log(response);
            if (onSubmit) {
                onSubmit();
            }
        }).catch((error) => {
            console.log(error);
        });
        setText("");
    }

    return (
        <div>{
            openReply ? 
            <div>
                <div
                    style={{display: 'flex'}}
                >
                    <TextField
                        sx={{
                            width: '100%',
                            "& .MuiInputBase-input": {
                                color: "whitesmoke"
                            }
                        }}
                        id="new-take"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        multiline
                        placeholder="Be the first to comment"
                        variant="filled"
                        slotProps={{
                            input: {
                                endAdornment:
                                    <InputAdornment position="end">
                                        <div
                                            className="send-button"
                                        >
                                            <IconButton
                                                onClick={submitComment}
                                                edge="end"
                                            >
                                                <Avatar
                                                    sx={{ width: 32, height: 32 }}
                                                >
                                                    <SendIcon
                                                        color="primary"
                                                    />
                                                </Avatar>
                                            </IconButton>
                                        </div>
                                    </InputAdornment>
                            }
                        }}
                    />
                    
                </div>
                <div style={{display: 'flex', paddingTop: '6px', position: 'absolute', right: 0, paddingRight: '2rem'}}>
                    <div style={{display: 'flex', color: 'whitesmoke', paddingTop: '2px'}}>
                        Rate it?
                    </div>
                    <div style={{paddingBottom: '6px', paddingLeft: '6px'}}>
                        <StarRating
                            type="take"
                            rating={mediaRating}
                            setRating={setMediaRating}
                        />
                    </div>
                </div>
            </div> : 
            <></>
        }</div>
    )
}

export default Take;