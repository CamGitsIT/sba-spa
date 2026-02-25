export type AgentSession = {
  id: string
  status: string
  archivedAt?: string | null
}

/**
 * Archives every session whose status is currently "open".
 * The original array is not mutated; a new array is returned with
 * open sessions marked as archived and stamped with an ISO timestamp.
 */
export function archiveAllOpenAgentSessions<T extends AgentSession>(
  sessions: T[] = [],
  archivedAt: Date = new Date()
): T[] {
  const archivedAtIso = archivedAt.toISOString()

  return sessions.map((session) => {
    const status = session.status?.trim().toLowerCase()

    if (status !== 'open') {
      return session
    }

    return {
      ...session,
      status: 'archived',
      archivedAt: session.archivedAt ?? archivedAtIso
    }
  })
}

export default archiveAllOpenAgentSessions
