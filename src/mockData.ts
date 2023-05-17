export type Comment = {
  id: number;
  service: Service;
  comment: string;
  author: string;
  created_at: string;
}

enum Service {
  Notion = "Notion",
  Linear = "Linear"
}

export const commentThread: Comment[] = [
  {
    id: 1,
    service: Service.Notion,
    comment: 'This is a good idea.',
    author: 'Doug Cooper',
    created_at: '1684191855'
  }, {
    id: 2,
    service: Service.Notion,
    comment: 'I agree. I like this feature.',
    author: 'Stormy Adams',
    created_at: '1684191870'
  }, {
    id: 3,
    service: Service.Linear,
    comment: '@doug when can we start this feature?',
    author: 'Stormy Adams',
    created_at: '1684191875'
  }, {
    id: 4,
    service: Service.Linear,
    comment: '@doug Could you work on this thing? It is a high priority.',
    author: 'Stormy Adams',
    created_at: '1684191885'
  }, {
    id: 5,
    service: Service.Linear,
    comment: '@elliot For clarity, what email address is the bug report being sent to?',
    author: 'Stormy Adams',
    created_at: '1684191890'
  }, {
    id: 6,
    service: Service.Linear,
    comment: '@stormy we can start this tuesday!!',
    author: 'Doug',
    created_at: '1684191900'
  }, {
    id: 7,
    service: Service.Linear,
    comment: '@stormy we should setup a meeting to discuss the UI',
    author: 'Doug',
    created_at: '1684191910'
  }
]