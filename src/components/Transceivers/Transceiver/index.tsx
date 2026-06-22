interface Props {
  uuid: string | null
}

export const Transceiver = ({ uuid }: Props) => {
  if (!uuid) return

  return <>I am the transceiver</>
}
