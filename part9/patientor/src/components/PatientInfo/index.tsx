import { useState, useEffect } from "react";
import patientService from '../../services/patients';
import { Patient } from "../../types";
import { Box, Typography, SvgIcon } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

interface Props {
    patientId: string;
}

const PatientInfo = ({ patientId } : Props) => {

    const [patientData, setPatientData] = useState<Patient>();

    useEffect(() => {
        const fetchPatientInfo = async () => {
            const patientInfo = await patientService.getPatient(patientId);
            setPatientData(patientInfo);
        };
        void fetchPatientInfo();
    }, []);

    return(
    	<div className="App">
				<br></br>
				<Box>
					<Typography variant="h5">{patientData?.name} {patientData?.gender === 'male' ? <SvgIcon component={MaleIcon}></SvgIcon> : <SvgIcon component={FemaleIcon}></SvgIcon>}</Typography>
					<Typography>ssh: {patientData?.ssn}</Typography>
					<Typography>occupation: {patientData?.occupation}</Typography>
				</Box>
      </div>
    )
}
export default PatientInfo;