import { eq } from 'drizzle-orm';

import { db } from '../src/db';
import { tasks } from '../src/schema/tasks';

async function seed() {
  const task: typeof tasks.$inferInsert = {
    name: 'Task 1',
    done: false,
  };

  console.log('🌱 Seeding the database');

  await db.insert(tasks).values(task);
  console.log('Task was created!');

  const selectedTasks = await db.select().from(tasks);
  console.log('Getting all tasks from the database:', selectedTasks);

  const [updatedTask] = await db
    .update(tasks)
    .set({ done: true })
    .where(eq(tasks.id, selectedTasks[0]!.id))
    .returning();
  console.log('Task was updated!', updatedTask);

  // await db.delete(tasks).where(eq(tasks.id, selectedTasks[0]!.id));
  // console.log('Task was deleted!');
}

try {
  await seed();
} catch (error) {
  console.error('Error during seeding:', error);
} finally {
  process.exit(0);
}
