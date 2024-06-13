import React from 'react'
import { MenuItem } from '../../../ui/MenuItem'
import { Button } from '../../../ui/Button'
import * as SC from './styles'

export const UserMenu = ({ username, onClickExitBtn }) => (
  <SC.MenuLinks>
    <MenuItem link={`/users/${username}`}>{username}</MenuItem>
    <MenuItem link='/friends'>Friends</MenuItem>
    <MenuItem link='/add'>Add Post</MenuItem>
    <Button className='white' onClick={onClickExitBtn}>
      Logout
    </Button>
  </SC.MenuLinks>
);

export const AdminMenu = ({ onClickExitBtn }) => (
  <SC.MenuLinks>
    <MenuItem link='/users'>Users</MenuItem>
    <Button className='white' onClick={onClickExitBtn}>
      Logout
    </Button>
  </SC.MenuLinks>
);

export const GuestMenu = () => (
  <SC.MenuLinks>
    <MenuItem link='/auth'>
      <Button className='white'>Login</Button>
    </MenuItem>
    <MenuItem link='/registration'>
      <Button>Create account</Button>
    </MenuItem>
  </SC.MenuLinks>
);
