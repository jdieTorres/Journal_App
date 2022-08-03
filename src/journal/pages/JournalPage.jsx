import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"

export const JournalPage = () => {

  const { isSaving, active } = useSelector( state => state.journal );

  const NoteSaving = useMemo(() => isSaving === true, [isSaving])
  
  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch( startNewNote() )
  }

  return (
    <JournalLayout>
      {/* <Typography> Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque minima nobis fugiat architecto qui distinctio corporis saepe nostrum totam aspernatur quam non enim praesentium error sapiente, sit cum nesciunt accusantium. </Typography> */}

      { (!!active) 
        ? <NoteView /> 
        : <NothingSelectedView /> 
      }

      <IconButton
        disabled={ NoteSaving }
        onClick= { onClickNewNote }
        size='large'
        sx={{
          color: 'white',
          backgroundColor: `${(!!active) ? 'secondary.main' : 'primary.main'}`,
          ':hover': { 
            backgroundColor: `${(!!active) ? 'secondary.main' : 'primary.main'}`, 
            opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}
