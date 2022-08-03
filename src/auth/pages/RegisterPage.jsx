import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from "../../hooks";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { AuthLayout } from "../layout/AuthLayout";

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un @'],
  password: [(value) => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres.'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth)

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {
    formState, email, password, displayName, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations);

  const onSubmit = (e) => {

    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              type="text"
              placeholder="Tu Nombre"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={formSubmitted ? displayNameValid : ''}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="Tu Correo"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted ? emailValid : ''}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Tu Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={formSubmitted ? passwordValid : ''}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12}>
              {errorMessage
                ? (<Alert severity='error'><strong>Error:</strong> {errorMessage}</Alert>)
                : ''
              }
            </Grid>

            <Grid item xs={12} >
              <Button
                sx={{ 
                  backgroundColor:'secondary.main',
                  ':hover': { backgroundColor: 'secondary.main', opacity: 0.9 },
               }}
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth>
                Crear Cuenta
              </Button>
            </Grid>

          </Grid>

          <Grid container dirention='row' justifyContent='end'>
            <Typography sx={{ mr: 1, color:'secondary.main' }} >¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} sx={{ color: 'primary.main' }} to="/auth/login">
              Ingresar
            </Link>
            <Link></Link>

          </Grid>

        </Grid>

      </form>
    </AuthLayout>
  )
}

