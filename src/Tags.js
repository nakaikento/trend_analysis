import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    display: "inline-block",
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function Tags(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={prefecture}
        getOptionLabel={option => option.name}
        defaultValue={props.prefecture}
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            label="都道府県"
            placeholder="都道府県を選択"
            fullWidth
          />
        )}
      />
    </div>
  );
}

const prefecture = [
  { name : 'すべて' },
  { name : '北海道' },
  { name : '青森' },
  { name : '岩手' },
  { name : '宮城' },
  { name : '秋田' },
  { name : '山形' },
  { name : '福島' },
  { name : '茨城' },
  { name : '栃木' },
  { name : '群馬' },
  { name : '埼玉' },
  { name : '千葉' },
  { name : '東京' },
  { name : '神奈川' },
  { name : '山梨' },
  { name : '長野' },
  { name : '新潟' },
  { name : '富山' },
  { name : '石川' },
  { name : '岐阜' },
  { name : '静岡' },
  { name : '愛知' },
  { name : '三重' },
  { name : '福井' },
  { name : '滋賀' },
  { name : '京都' },
  { name : '大阪' },
  { name : '兵庫' },
  { name : '奈良' },
  { name : '和歌山' },
  { name : '鳥取' },
  { name : '島根' },
  { name : '岡山' },
  { name : '広島' },
  { name : '山口' },
  { name : '徳島' },
  { name : '香川' },
  { name : '愛媛' },
  { name : '高知' },
  { name : '福岡' },
  { name : '佐賀' },
  { name : '長崎' },
  { name : '熊本' },
  { name : '大分' },
  { name : '宮崎' },
  { name : '鹿児島' },
  { name : '沖縄' }
]
