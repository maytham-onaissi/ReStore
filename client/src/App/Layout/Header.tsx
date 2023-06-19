import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
interface props {
  themeHandler: () => void;
  darkMode: boolean;
}
const Header = ({ themeHandler, darkMode }: props) => {
  return (
    // sx={mb: 4}, the 4 is multiplied by 8, which equals 32p.
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">Re-Store</Typography>
        <Switch onChange={themeHandler} checked={darkMode} />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
