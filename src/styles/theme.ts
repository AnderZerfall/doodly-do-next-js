export type ThemeType = {
    themeTitle: string,
    mainBg: string,
    secondaryBg: string,
    interactiveBg: string,
    primary: string,
    text: string,
    border: string
    hoverBg: string,
    hoverPrimary: string,
};

export const darkTheme = {
    themeTitle: 'dark',
    mainBg: '#1A1D1F',
    secondaryBg: '#232629',
    interactiveBg: '#2D2F32',
    primary: '#906FF3',
    text: '#FFFFFF',
    border: '#404549',
    hoverBg: '#383A3E',
    hoverPrimary: '#AC92F8'
}

export const lightTheme = {
    themeTitle: 'light',
    mainBg: '#FFFFFF',
    secondaryBg: '#EFF5FF',
    interactiveBg: '#E0EDFF',
    primary: '#6FACF3',
    text: '#6FACF3',
    border: '#FFFFFF',
    hoverBg: '#DDF0FF',
    hoverPrimary: '#8DC0FB'
}