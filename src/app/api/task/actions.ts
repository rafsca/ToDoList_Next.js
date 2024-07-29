import { prisma } from "../connection";

export async function actionCreateTask(title: string) {
  await prisma.task.create({
    data: {
      title: title,
    },
  });
}

export async function actionGetTasks() {
  const tasks = await prisma.task.findMany();
  return tasks;
}

export async function actionDeleteTask(id: number) {
  await prisma.task.delete({
    where: {
      id: id,
    },
  });
}

export async function actionToggleCompleted(id: number) {
  const task = await prisma.task.findUnique({
    where: { id: id },
  });
  if (task) {
    const newCompletedStatus = !task.completed;

    await prisma.task.update({
      where: { id: id },
      data: { completed: newCompletedStatus },
    });
  } else {
    throw new Error(`Task with id ${id} not found`);
  }
}
