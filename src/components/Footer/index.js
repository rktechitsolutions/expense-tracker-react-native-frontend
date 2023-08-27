import PropTypes from "prop-types";

import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import typography from "../../assets/theme/base/typography";

function Footer({ company, links }) {
    const { href, name } = company;
    const { size } = typography;

    const renderLinks = () =>
        links.map((link) => (
            <Box key={link.name} component="li" px={2} lineHeight={1}>
                <Link href={link.href} target="_blank">
                    <Typography variant="button" fontWeight="regular" className="color-custom-grey">
                        {link.name}
                    </Typography>
                </Link>
            </Box>
        ));

    return (
        <Box
            width="100%"
            display="flex"
            flexDirection={{ xs: "column", lg: "row" }}
            justifyContent="space-between"
            alignItems="center"
            px={1.5}
            className="box-footer-custom"
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
                color="text"
                fontSize={size.sm}
                px={1.5}
            >
                &copy; {new Date().getFullYear()},

                <Link href={href} target="_blank">
                    <Typography variant="button" fontWeight="medium">
                        &nbsp;{name}&nbsp;
                    </Typography>
                </Link>
            </Box>
            <Box
                component="ul"
                sx={({ breakpoints }) => ({
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    listStyle: "none",
                    mt: 3,
                    mb: 0,
                    p: 0,

                    [breakpoints.up("lg")]: {
                        mt: 0,
                    },
                })}
            >
                {renderLinks()}
            </Box>
        </Box>
    );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
    company: { href: "#", name: "Expense Calculator" },
    links: [
        { href: "#", name: "Privacy Policy" },
    ],
};

// Typechecking props for the Footer
Footer.propTypes = {
    company: PropTypes.objectOf(PropTypes.string),
    links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
