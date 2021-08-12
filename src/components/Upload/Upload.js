import React from 'react'
import Dropzone from 'react-dropzone'
import useStyles from './styles'
import clsx from 'clsx';

function Upload({handleUploadImage}) {
    const classes = useStyles();
    return (
        <Dropzone accept='image/*' multiple onDropAccepted={handleUploadImage}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject, isFocused, isDragAccept }) => (
                <>
                    <div
                        {...getRootProps({ className: 'dropzone' })}
                        className={clsx(classes.container,
                        {
                            [classes.dragActive] : isDragActive || isFocused,
                            [classes.dragReject] : isDragReject,
                            [classes.dragAccept] : isDragAccept,
                        })}
                    >
                        <input {...getInputProps()} />
                        <p>Arrastre algunas images aquí, o click para seleccionar imagenes</p>
                    </div>
                </>
            )}
        </Dropzone>
    )
}

export default Upload
