import { arrayMove } from '@dnd-kit/sortable';
import { WorkspaceInterface } from '../store/types';

export const generateId = (): string => {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001).toString();
};

export const updateObjectValue = (
  key: string,
  value: unknown,
  object: unknown
) => {
  return {
    ...(object as object),
    [key]: value,
  };
};

export const updateWorkspaceHelper = (
  workspaces: WorkspaceInterface[],
  updatedWorkspace: WorkspaceInterface,
  id: string
) =>
  workspaces.map((workspace: WorkspaceInterface) => {
    return workspace.id === id ? updatedWorkspace : workspace;
  });

export const updateArrayElement = <T extends { id: string }>(
  element: T[],
  id: string,
  updatedElement: T
) => {
  return element.map((element) => {
    return element.id === id ? updatedElement : element;
  });
};

export const getTaskPosition = <T extends { id: string }>(
  elements: T[],
  id: string
) => elements.findIndex((element) => element.id === id);

export const changedElementsOrder = <T>(
  elements: T[],
  originalPosition: number,
  newPosition: number
) => {
  return arrayMove(elements, originalPosition, newPosition);
};
