import { CircularProgress } from '@material-ui/core';
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon, Link as LinkIcon } from '@material-ui/icons';
import React from 'react'
import useStyles from './styles'

function ListImages({ files }) {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            {files.map(file => (
                <div key={file.id} className={classes.containerFile}>
                    <div className={classes.imagePreview}>
                        <img src={file.preview} alt={file.name} className={classes.image} />
                        <div className={classes.imgInfo}>
                            <strong style={{ wordBreak: 'break-all' }}>{file.name}</strong>
                            <div style={{ color: 'GrayText' }}>
                                <span>{file.readableSize}</span>
                                { file.uploaded && <button>Eliminar</button>}
                            </div>
                        </div>

                    </div>
                    <div className={classes.fileStatus}>
                        {(!file.uploaded && !file.error) && <CircularProgress variant='determinate' value={file.progress} style={{ width : '24px', height: '24px'}} />}
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
