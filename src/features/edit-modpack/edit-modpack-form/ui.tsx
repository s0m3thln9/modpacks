import { Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from '../../../shared/ui'
import { modpacksSlice } from '../../../entities/modpack'
import { useAppDispatch, useAppSelector } from '../../../app/stores'
import { useState } from 'react'
import { Notification } from '../../../widgets/notification'

type Values = {
	name: string
	description: string
	modlist: string[]
}

const EditModpackSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
	modlist: Yup.array()
		.of(Yup.string().required('Required'))
		.min(1, 'Required'),
})

export const EditModpackForm = () => {
	const dispatch = useAppDispatch()
	const [notification, setNotification] = useState<{
		message: string
		type: 'success' | 'error'
	} | null>(null)
	const modpacks = useAppSelector(
		modpacksSlice.selectors.selectSortedModpacks,
	)
	const selectedModpack = useAppSelector(
		modpacksSlice.selectors.selectSelectedModpack,
	)

	const initialValues = {
		name: selectedModpack?.name || '',
		description: selectedModpack?.description || '',
		modlist:
			selectedModpack?.modlist.ids.map(
				mod => selectedModpack?.modlist.entities[mod]?.name,
			) || [],
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={EditModpackSchema}
			onSubmit={(values: Values) => {
				if (
					!modpacks.find(modpack => modpack.name === values.name) ||
					values.name === selectedModpack?.name
				) {
					setNotification({
						message: `Modpack ${values.name} edited successfully`,
						type: 'success',
					})
					dispatch(
						modpacksSlice.actions.edit({
							modpack: {
								...values,
								id: selectedModpack?.id,
							},
						}),
					)
				} else {
					setNotification({
						message: `Modpack ${values.name} already exists`,
						type: 'error',
					})
				}
			}}
		>
			{({
				values,
				initialValues,
				errors,
				touched,
			}: {
				values: Values
				initialValues: Values
				errors: any
				touched: any
			}) => (
				<Form className='flex flex-col gap-y-10'>
					<div className='flex flex-col gap-y-2'>
						{notification && (
							<Notification
								message={notification.message}
								type={notification.type}
								onClose={() => setNotification(null)}
							/>
						)}
						<label className='text-textColor text-2xl'>
							Modpack Name
						</label>
						<Field
							name='name'
							className='self-start rounded p-2 outline-none bg-textColor text-buttonPrimaryTextColor'
							initialValue={initialValues.name}
						/>
						{errors.name && touched.name && (
							<div className='text-errorColor'>{errors.name}</div>
						)}
					</div>
					<div className='flex flex-col gap-y-2'>
						<label className='text-textColor text-2xl'>
							Modpack Description
						</label>
						<Field
							name='description'
							className='self-start rounded p-2 outline-none bg-textColor text-buttonPrimaryTextColor'
						/>
						{errors.description && touched.description && (
							<div className='text-errorColor'>
								{errors.description}
							</div>
						)}
					</div>
					<div className='flex flex-col gap-y-2'>
						<label className='text-textColor text-2xl'>
							Modlist
						</label>
						<FieldArray name='modlist'>
							{({ push, remove }) => (
								<div className='flex flex-col gap-y-2'>
									{values.modlist.map((_, index) => (
										<div
											key={index}
											className='flex gap-x-2'
										>
											<Field
												name={`modlist.${index}`}
												className='self-start rounded p-2 outline-none bg-textColor text-buttonPrimaryTextColor'
											/>
											<Button
												variant='secondary'
												type='button'
												onClick={() => remove(index)}
											>
												Delete
											</Button>
										</div>
									))}
									<Button
										variant='secondary'
										type='button'
										onClick={() => push('')}
										className='self-start'
									>
										Add mod
									</Button>
								</div>
							)}
						</FieldArray>
						{errors.modlist && touched.modlist && (
							<div className='text-errorColor'>
								{errors.modlist}
							</div>
						)}
					</div>
					<Button
						type='submit'
						variant='primary'
						className='self-start'
					>
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	)
}
