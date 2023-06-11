import Container from "@mui/material/Container";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import "./Universities.scss"
import Table from './Table/Table'

const Universities = () => {
    return (
        <Container
            maxWidth={"xl"}
            className={"students"}
        >
            <Paper className={"container"}>
                <Typography
                    variant={"h4"}
                    className={"title"}
                    sx={{fontFamily: "Roboto"}}
                >
                    Universidades
                </Typography>
            </Paper>
            <Table />
        </Container>
    )
}

export default Universities