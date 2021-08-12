import { CircularProgress } from '@material-ui/core';
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon, Link as LinkIcon } from '@material-ui/icons';
import React, {useState} from 'react'
import { useEffect } from 'react';
import useStyles from './styles'

function ListImages({ files, handleDelete, idloan, idfamily }) {
    const classes = useStyles();
    const [ filesUploaded, setFilesUploaded ]= useState([ ...files])
    const deleteImage = (idimage)=>{
        setFilesUploaded( filesUploaded.map( fu=>fu.id=== idimage?{ ...fu, deleting : true}:fu));
        handleDelete(idloan, idfamily, idimage)

    }
    useEffect(()=>{
        setFilesUploaded([...files])
    },[files])
    return (
        <div className={classes.container}>
            {filesUploaded.map(file => (
                <div key={file.id} className={classes.containerFile}>
                    <div className={classes.imagePreview}>
                        <img src={file.preview} alt={file.name} className={classes.image} />
                        <div className={classes.imgInfo}>
                            <strong className={classes.imgName}>{file.name}</strong>
                            <div style={{ color: 'GrayText' }}>
                                <span>{file.readableSize}</span>
                                { file.uploaded && !file.deleting && <button onClick={()=>deleteImage(file.id)}>Eliminar</button>}
                            </div>
                        </div>

                    </div>
                    <div className={classes.fileStatus}>
                        {(!file.uploaded && !file.error) && <CircularProgress variant='determinate' value={file.progress} style={{ width : '24px', height: '24px'}} />}
                        { file.deleting  && <CircularProgress style={{ width : '24px', height: '24px'}} color='secondary' />}
                        {file.uploaded && <CheckCircleIcon style={{ fill : '#03DAC6'}} />}
                        {file.error && <ErrorIcon style={{ fill : '#B00020'}} />}
                        {file.url && <a href={file.url} rel="noreferrer" target='_blank' ><LinkIcon style={{fill : 'GrayText'}} /></a>}
                    </div>

                </div>
            ))}
        </div>
    )
}

export default ListImages
