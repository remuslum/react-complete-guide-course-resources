import { Link, redirect, useNavigate, useNavigation, useParams, useSubmit } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';

import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { state } = useNavigation()
  const params = useParams()
  const eventId = params.id
  const submit = useSubmit()

  const {data, isError, error} = useQuery({
    queryFn: ({signal}) => fetchEvent({signal, id:eventId}) ,
    queryKey: ["events", eventId],
    staleTime: 1000
  })

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event

  //     // Optimistic updating - updating front end before backend
  //     await queryClient.cancelQueries({queryKey: ["events", eventId]})
  //     const previousEvent = queryClient.getQueryData(["events", eventId])
  //     queryClient.setQueryData(["events", eventId], newEvent)

  //     return { previousEvent }
  //   }, 
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(["events", eventId], context.previousEvent)
  //   }, 
  //   // no matter pass or fail, this method is invoked
  //   onSettled: () => {
  //     queryClient.invalidateQueries(["events", eventId])
  //   }
  // })

  function handleSubmit(formData) {
    submit(formData, {method: "PUT"})
  }

  function handleClose() {
    navigate('../');
  }

  let content

  if (isError){
    content = (
      <>
        <ErrorBlock title="Failed to load event" message={error.info?.message || "Failed to load event. Please check your inputs and try again later"} />
        <div className="form-actions">
          <Link to="../" className='button'>
            Okay
          </Link>
        </div>
      </>
    )
  }

  if(data){
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <span>Sending Data</span>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
        
      </EventForm>
    )
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loader({params}){
  return queryClient.fetchQuery({
    queryKey:["events", params.id],
    queryFn: ({ signal }) => fetchEvent({signal, id:params.id})
  })
}

export async function action({request, params}){
  const formData = await request.formData()
  const updatedEvent = Object.fromEntries(formData)

  await updateEvent({id: params.id, event: updatedEvent})
  queryClient.invalidateQueries(["events", params.id])

  return redirect("../")
}
