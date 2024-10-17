'use client'
import React, { useEffect, useState } from 'react'
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import { toast } from 'react-toastify'
import { useMemberStore } from '@/app/store/MyStore/MembersStore'
import { MemberForAdmin } from '@/app/store/Models/Member'
import { shallow } from 'zustand/shallow'

interface UserFormProps {
  editingMember: {
    NomPrenom: string
    _id: string
    Email: string
    Password: string
    Role: string
    Adresse: string
    ImageLink: string
    Departement: string
  } | null
  setEditingMember: React.Dispatch<React.SetStateAction<any>>
}

const UserForm: React.FC<UserFormProps> = ({
  editingMember,
  setEditingMember
}) => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    _id: '',
    NomPrenom: '',
    Email: '',
    Password: '',
    Role: 'member',
    Departement: 'Basic',
    Adresse: '',
    Image: null
  })

  const convertFormToMemberForAdmin = (form: any): MemberForAdmin => {
    return {
      _id: form._id,
      NomPrenom: form.NomPrenom,
      Email: form.Email,
      Password: form.Password,
      Role: form.Role,
      Adresse: form.Adresse,
      ImageLink: form.Image,
      Departement: form.Departement
    }
  }

  const fetchMembersForAdmin = useMemberStore(
    state => state.fetchMembersForAdmin
  )
  const updateMembersForAdmin = useMemberStore(
    state => state.updateMembersForAdmin
  )
  const addMembersForAdmin = useMemberStore(state => state.addMembersForAdmin)

  useEffect(() => {
    if (editingMember) {
      console.log('initialement')
      console.log(editingMember.Password)

      setForm({
        _id: editingMember._id,
        NomPrenom: editingMember.NomPrenom,
        Email: editingMember.Email,
        Password: '',
        Role: editingMember.Role || 'member',
        Departement: editingMember.Departement || 'Basic',
        Adresse: editingMember.Adresse,
        Image: editingMember.ImageLink || null
      })
    }
  }, [editingMember])

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const memberData = convertFormToMemberForAdmin(form)

      if (editingMember) {
        // Si le champ mot de passe est vide, conserver l'ancien mot de passe
        if (form.Password.trim() === '') {
          memberData.Password = ''
          console.log('conserver')
        } else {
          // Si un nouveau mot de passe est entré, le mettre à jour
          memberData.Password = form.Password
        }
        console.log('fil requete')
        console.log(memberData.Password)

        await updateMembersForAdmin(form._id, memberData)
        console.log('apres')
        console.log(memberData.Password)
        toast.success('Membre mis à jour avec succès!', {
          position: 'top-center'
        })
      } else {
        // Ajouter un nouveau membre
        await addMembersForAdmin(memberData)
        toast.success('Membre ajouté avec succès!', { position: 'top-center' })
      }

      await fetchMembersForAdmin()
      resetForm()
    } catch (error) {
      toast.error("Erreur lors de l'opération", { position: 'top-center' })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({
      _id: '',
      NomPrenom: '',
      Email: '',
      Password: '',
      Role: 'member',
      Departement: 'Basic',
      Adresse: '',
      Image: null
    })
    setEditingMember(null)
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target as HTMLInputElement
    setForm(prevForm => ({ ...prevForm, [name!]: value }))
  }

  return (
    <Box
      component='form'
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingRight: 4 }}
    >
      <TextField
        label='Nom et Prénom'
        name='NomPrenom'
        value={form.NomPrenom}
        onChange={handleChange}
        required
      />
      <TextField
        label='Email'
        name='Email'
        value={form.Email}
        onChange={handleChange}
        required
      />
      <TextField
        label='Mot de passe'
        name='Password'
        type='password'
        value={form.Password}
        onChange={handleChange}
        // Rendre le champ mot de passe non requis si on est en mode édition
        required={!editingMember}
      />

      <FormControl fullWidth>
        <InputLabel id='role-select-label'>Rôle</InputLabel>
        <Select
          labelId='role-select-label'
          id='role-select'
          name='Role'
          value={form.Role}
          label='Rôle'
          onChange={handleChange}
          required
        >
          <MenuItem value='member'>Membre</MenuItem>
          <MenuItem value='instructor'>Instructeur</MenuItem>
          <MenuItem value='super_admin'>Super Admin</MenuItem>
        </Select>
      </FormControl>

      {form.Role !== 'super_admin' && (
        <FormControl fullWidth>
          <InputLabel id='departement-select-label'>Département</InputLabel>
          <Select
            labelId='departement-select-label'
            id='departement-select'
            name='Departement'
            value={form.Departement}
            label='Département'
            onChange={handleChange}
            required
          >
            <MenuItem value='Basic'>Basique</MenuItem>
            <MenuItem value='Intermediate'>Intermédiaire</MenuItem>
            <MenuItem value='Advanced'>Avancé</MenuItem>
          </Select>
        </FormControl>
      )}

      <TextField
        label='Adresse'
        name='Adresse'
        value={form.Adresse}
        onChange={handleChange}
        required
      />

      <input
        type='file'
        name='Image'
        onChange={handleChange}
        accept='image/*'
      />

      <Button
        variant='contained'
        color='primary'
        type='submit'
        disabled={loading}
      >
        {loading
          ? 'En cours...'
          : editingMember
            ? 'Mettre à jour'
            : 'Ajouter un utilisateur'}
      </Button>
    </Box>
  )
}

export default UserForm
