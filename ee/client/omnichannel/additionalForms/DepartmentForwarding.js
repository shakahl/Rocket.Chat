import { Field, MultiSelectFiltered, Box } from '@rocket.chat/fuselage';
import React, { useMemo } from 'react';

import { useTranslation } from '../../../../client/contexts/TranslationContext';
import { useEndpointData } from '../../../../client/hooks/useEndpointData';

const param = { onlyMyDepartments: true };
export const DepartmentForwarding = ({ departmentId, value, handler, label, placeholder }) => {
	const t = useTranslation();
	const { value: data } = useEndpointData('livechat/department', param);

	const options = useMemo(
		() =>
			(data && [
				...data.departments
					.filter((department) => department._id !== departmentId)
					.map((department) => [department._id, department.name]),
			]) ||
			[],
		[data, departmentId],
	);

	return (
		<Field>
			<Field.Label>{t(label)}</Field.Label>
			<Field.Row>
				<Box w='100%'>
					<MultiSelectFiltered
						w='100%'
						value={value}
						options={options}
						onChange={handler}
						disabled={!options}
						placeholder={t(placeholder)}
						flexGrow={1}
					/>
				</Box>
			</Field.Row>
			<Field.Hint>{t('List_of_departments_for_forward_description')}</Field.Hint>
		</Field>
	);
};

export default DepartmentForwarding;
