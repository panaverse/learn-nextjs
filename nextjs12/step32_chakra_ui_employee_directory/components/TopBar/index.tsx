import { Box, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
function TopBar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const ColorModeIcon = colorMode === 'light' ? SunIcon : MoonIcon;

    return (
        <Box width="100%" padding="3" backgroundColor="twitter.500">
            <Box maxWidth="container.xl" margin="auto">
                <Button
                    aria-label="UI Theme"
                    leftIcon={<ColorModeIcon />}
                    onClick={toggleColorMode}
                    size="xs"
                    marginRight="10"
                    borderRadius="sm"
                    backgroundColor={ useColorModeValue('twitter.50', 'twitter.500')}
                    >
                    Toggle theme
                </Button>
            </Box>
        </Box>
    );
}
export default TopBar;