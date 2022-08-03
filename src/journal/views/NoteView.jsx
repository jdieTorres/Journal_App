import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Delete, SaveOutlined, Upload } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components'
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';
import { formatDate, formatHour } from "../../helpers/formatFields"


export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

    const { body, title, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date])

    const dateFormat = formatDate(dateString)
    const hourFormat = formatHour(dateString)

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [formState])

    useEffect(() => {
      if ( messageSaved.length > 0 ) {
          Swal.fire('Nota actualizada', messageSaved, 'success');
      }
    }, [messageSaved])

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {
        if( target.files === 0 ) return;
        dispatch( startUploadingFiles( target.files ) );
    }

    const onDelete = () => {
        dispatch( startDeletingNote() )
        Swal.fire('Nota eliminada','', 'error');
    }

    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center' 
            sx={{ mb: 1 }}>
            <Grid item sx={{ mb: 1 }}>
                <Typography fontSize={30} fontWeight='ligth' >{ dateFormat }</Typography>
                <Typography fontSize={20} fontWeight='ligth' >{ hourFormat }</Typography>
            </Grid>
            <Grid item sx={{ mb: 1 }}>

                <input 
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />

                <IconButton
                    color="secondary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <Upload />
                </IconButton>

                <Button 
                    disabled={ isSaving }
                    onClick={ onSaveNote }
                    sx={{ padding: 2, color:'secondary.main' }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={ 5 }
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2, color: 'red'}}
                >
                    <Delete />
                    Borrar Nota
                </Button>
            </Grid>

            <ImageGallery images={ note.imageUrls } />

        </Grid>
    )
}