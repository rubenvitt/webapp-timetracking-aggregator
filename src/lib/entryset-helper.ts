export function extractTicketNr(title: string) {
  return title.split(":")[0];
}