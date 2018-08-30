const layoutHeaderHeight = 64
const layoutContainerPaddingTop = 20
const toolbarHeight = 30
const toolbarMarginBottom = 20
const lanePaddingTop = 12
const laneTitleHeight = 28

export default {
  AUTH_TOKEN_STORAGE_KEY: 'introduce-token',
  AUTH_TOKEN_HEADER: 'x-auth-token',
  DND_TYPES: {
    TASK: 'task'
  },
  PLACE_HOLDER_ID: 'placeholder-task-id',
  OFFSET_HEIGHT: layoutHeaderHeight + layoutContainerPaddingTop + toolbarHeight + toolbarMarginBottom + lanePaddingTop + laneTitleHeight,
  TASK_HEIGHT: 89,
  TASK_MARGIN: 5
}
