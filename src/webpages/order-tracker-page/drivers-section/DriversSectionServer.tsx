import { EntityDriversService } from '@/services/order-tracker/drivers/EntityDriversService';
import PageHeaderClient from '@/webpages/shared/components/page-header/PageHeaderClient';
import { Skeleton } from 'antd';
import { Suspense } from 'react';
import styles from './DriversSectionServer.module.css';
import DynamicDriversSectionClient from './DynamicDriversSectionClient';

async function DriversSectionServer() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const driversService = new EntityDriversService();
  const drivers = await driversService.genMany({});
  const driversWithStringId = drivers.map((driver) =>
    driversService.getAsClientEntity(driver)
  );
  return (
    <>
      <PageHeaderClient hasDivider title='Drivers' />
      <DynamicDriversSectionClient drivers={driversWithStringId} />
    </>
  );
}

export default async function DriversSectionServerWithSuspense() {
  return (
    <section className={styles['root-container']}>
      <Suspense fallback={<Skeleton loading active />}>
        <DriversSectionServer />
      </Suspense>
    </section>
  );
}
