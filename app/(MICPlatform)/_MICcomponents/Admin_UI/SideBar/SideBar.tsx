// Sidebar.js
import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link' // Importer Link de Next.js
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

const drawerWidth = 200

export default function Sidebar({ links }) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
      variant='permanent'
      anchor='left'
    >
      <Toolbar />
      <Divider />
      <List>
        {links.map((link, index) => (
          <ListItem key={link.path} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <Link href={link.path} passHref legacyBehavior>
                <ListItemText primary={link.label} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
