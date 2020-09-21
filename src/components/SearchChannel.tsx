import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Router, { useRouter } from "next/router";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import useFormInput from "../utils/hooks/useFormInput";
import Button from "@material-ui/core/Button";

export default function SearchChannel() {
  const router = useRouter();
  const [state, setState] = useState({
    japanese: !!router.query.japanese || false,
    european: !!router.query.european || false,
    chinese: !!router.query.chinese || false,
    ramen: !!router.query.ramen || false,
    cafe: !!router.query.cafe || false,
    sweets: !!router.query.sweets || false,
    chili: !!router.query.chili || false,
  });

  const baseKeyword = useFormInput(word);

  const minSubscriberCount = useFormInput();
  const maxSubscriberCount = useFormInput();

  let query = { keyword: searchKeyword };
  if (minSubscriberCount.value)
    query.minSubscriberCount = minSubscriberCount.value;
  if (maxSubscriberCount.value)
    query.maxSubscriberCount = maxSubscriberCount.value;
  if (minViewCount.value) query.minViewCount = minViewCount.value;
  if (maxViewCount.value) query.maxViewCount = maxViewCount.value;

  const handleChangeCheckBox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const submit = () => {
    Router.push({
      pathname: "/youtuber",
      query,
    });
  };

  const ValidationTextField = withStyles({
    root: {
      "& input:valid:focus + fieldset": {
        borderLeftWidth: 6,
        padding: "4px !important", // override inline-style
      },
    },
  })(TextField);

  return (
    <>
      <Typography variant="body2" color="textPrimary">
      おすすめカテゴリ
      </Typography>
      <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.japanese}
            onChange={handleChangeCheckBox}
            name="japanese"
          />
        }
        label="和食"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.european}
            onChange={handleChangeCheckBox}
            name="european"
          />
        }
        label="洋食"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.chinese}
            onChange={handleChangeCheckBox}
            name="chinese"
          />
        }
        label="中華"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.ramen}
            onChange={handleChangeCheckBox}
            name="ramen"
          />
        }
        label="ラーメン"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.cafe}
            onChange={handleChangeCheckBox}
            name="cafe"
          />
        }
        label="カフェ"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.sweets}
            onChange={handleChangeCheckBox}
            name="sweets"
          />
        }
        label="スイーツ"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.chili}
            onChange={handleChangeCheckBox}
            name="chili"
          />
        }
        label="激辛"
      />
      </FormGroup>
      {/* スペース用に適当に入れた */}
      <Box mt={2}></Box>

      <Typography variant="body2" color="textPrimary">
      チャンネル登録者数
      </Typography>
      <ValidationTextField
      className={classes.rightSpace}
      variant="outlined"
      label="min"
      size="small"
      {...minSubscriberCount}
      />
      {/* スペース用に適当に入れた */}
      <Box mt={2}></Box>


      <Typography variant="body2" color="textPrimary">
      チャンネル登録者数
      </Typography>
      <ValidationTextField
      className={classes.rightSpace}
      variant="outlined"
      label="min"
      size="small"
      {...minSubscriberCount}
      />
      <ValidationTextField
      variant="outlined"
      label="max"
      size="small"
      {...maxSubscriberCount}
      />

      {/* スペース用に適当に入れた */}
      <Box mt={2}></Box>

      <Typography variant="body1" color="textPrimary">
      フリーワード
      </Typography>
      <ValidationTextField
      variant="outlined"
      size="small"
      {...baseKeyword}
      />

      {/* スペース用に適当に入れた */}
      <Box mt={2}> </Box>

      <Button
      variant="contained"
      color="primary"
      onClick={submit}
      size="large"
      >
      検索する
      </Button>
    </>
  )
}
