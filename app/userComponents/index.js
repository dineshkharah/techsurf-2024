import { Container } from "./Container";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { Image } from "./Image";
import { Button } from "./Button";

export const components = {
    container: {
        name: 'Container',
        component: Container,
        props: {
            children: { type: "component" },
        },
        defaultProps: {
            children: "This is a container",
        },
    },
    heading: {
        name: 'Heading',
        component: Heading,
        props: {
            text: { type: "text" },
        },
        defaultProps: {
            text: "Default Heading",
        },
    },
    text: {
        name: 'Text',
        component: Text,
        props: {
            text: { type: "text" },
        },
        defaultProps: {
            text: "This is some default text",
        },
    },
    image: {
        name: 'Image',
        component: Image,
        props: {
            src: { type: "text" },
        },
        defaultProps: {
            src: "https://via.placeholder.com/150",
        },
    },
    button: {
        name: 'Button',
        component: Button,
        props: {
            text: { type: "text" },
            link: { type: "text" },
        },
        defaultProps: {
            text: "Click Me",
            link: "#",
        },
    },
};
