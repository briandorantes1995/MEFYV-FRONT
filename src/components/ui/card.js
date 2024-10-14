import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { format, parseISO } from 'date-fns';

const StyledCard = styled.div`
  min-width: 60%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background-color: aliceblue;
  margin-bottom: 16px; /* Espaciado entre tarjetas */
`;

const CardHeader = styled(Typography)`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
`;

const CardTitle = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
`;

const Description = styled(Typography)`
  font-size: 16px;
`;

const Identifier = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
  color: #007BFF; /* Color azul para el identificador */
`;

export default function BasicCard({ remision }) {
    const formattedDate = remision.fecha ? format(new Date(remision.fecha), 'dd/MM/yyyy') : 'Fecha no especificada';

    return (
        <StyledCard>
            <CardHeader color="textSecondary" gutterBottom>
                Fecha: {formattedDate}
            </CardHeader>
            <CardTitle variant="h5" component="div">
                Cliente: {remision.cliente}
            </CardTitle>
            <Description>Domicilio: {remision.domicilio}</Description>
            <Description>RFC: {remision.rfc}</Description>
            <Identifier>Identificador: {remision.identificador}</Identifier>
        </StyledCard>
    );
}


