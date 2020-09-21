import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import useFormInput from '../utils/hooks/useFormInput'
import Router from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.35),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.45),
      },
      marginHorizontal: 'auto',
      [theme.breakpoints.up('sm')]: {
        width: '50%',
      },
      margin: '0 auto',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  })
)

export default function SearchTop() {
  const classes = useStyles();
  const search = useFormInput('');

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="例：東京、唐揚げ"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onKeyPress={e => {
          if (e.key == 'Enter') {
            e.preventDefault()
            Router.push({
              pathname: '/youtuber',
              query: { keyword: search.value }
            })
          }
        }}
        {...search}
      />
    </div>
  )
}
