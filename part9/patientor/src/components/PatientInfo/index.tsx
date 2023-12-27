import { useState, useEffect } from "react";
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnosis';
import { Patient, Entry, Diagnosis } from "../../types";
import { Box, Typography, SvgIcon } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

interface Props {
    patientId: string;
}

const PatientInfo = ({ patientId } : Props) => {

    const [patientData, setPatientData] = useState<Patient>();
		const [diagnosis, setDiagnoses] = useState<Diagnosis[]>();

    useEffect(() => {
        const fetchPatientInfo = async () => {
            const patientInfo = await patientService.getPatient(patientId);
            setPatientData(patientInfo);
        };
        void fetchPatientInfo();
				const fetchDiagnosesInfo =async () => {
					const diagnosesInfo = await diagnosisService.getAll();
					setDiagnoses(diagnosesInfo);
				};
				void fetchDiagnosesInfo();
    }, []);

		if(patientData === undefined){
			return(
				<div className="App">
					<Typography>Patiend not found!</Typography>
				</div>
			)
		}

		const fetchDiagnoseData = (code: string) => {
			const matchingCodes = diagnosis?.find((d) => d.code === code);
			if(matchingCodes){
				const name = matchingCodes.name;
				return name;
			}
		}
    return(
    	<div className="App">
				<br />
				<Box>
					<Typography variant="h5">{patientData?.name} {patientData?.gender === 'male' ? <SvgIcon component={MaleIcon}></SvgIcon> : <SvgIcon component={FemaleIcon}></SvgIcon>}</Typography>
					<Typography>ssh: {patientData?.ssn}</Typography>
					<Typography>occupation: {patientData?.occupation}</Typography>
				</Box>
				<br />
				<Box>
					<Typography variant="h6">entries</Typography>
					{Object.values(patientData.entries).map((entry: Entry) => (
						<Box key={entry.id}>
							<Typography>{entry.date}: {entry.description}</Typography>
							<ul>
								{entry.diagnosisCodes ? Object.values(entry.diagnosisCodes).map((code: string)=> (
									<li>{code} {fetchDiagnoseData(code)}</li>
								)) : <ul><Typography></Typography></ul>}
							</ul>
						</Box>
					))}
				</Box>
      </div>
    )
}
export default PatientInfo;