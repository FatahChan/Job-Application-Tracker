import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import { SelectItem } from '@/components/ui/select';
import TextInputField from '../TextInputField';
import TextAreaField from '../TextAreaField';
import DateField from '../DateField';
import SelectField from '../SelectField';
import { Form } from '@/components/ui/form';

import { type JobApplicationType, formSchema } from '@/schema/Application';
import { useMemo } from 'react';

export function JobApplicationTrackerForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: Partial<JobApplicationType>;
  onSubmit?: (values: JobApplicationType) => Promise<void>;
}) {
  const _defaultValues: JobApplicationType = useMemo(
    () => ({
      role: '',
      company: '',
      posting: '',
      salary: null,
      notes: '',
      status: 'applied',
      applicationDate: new Date(),
      interviewDate: null,
      rejectionDate: null,
      offerDate: null,
      acceptanceDate: null,
      ...defaultValues,
    }),
    [defaultValues]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: _defaultValues,
  });

  const handleSubmit = async (values: JobApplicationType) => {
    try {
      await onSubmit?.(values);
      form.reset(_defaultValues);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 gap-8">
        <TextInputField formControl={form.control} name="role" placeholder="Software Engineer" label="Role *" />
        <TextInputField formControl={form.control} name="company" placeholder="Tempo" label="Company *" />
        <TextInputField
          formControl={form.control}
          name="posting"
          placeholder="https://www.linkedin.com/jobs/collections/recommended/?currentJobId=3944145029"
          label="Posting *"
        />
        <TextInputField
          formControl={form.control}
          name="salary"
          placeholder="1000"
          type="number"
          inputMode="numeric"
          label="Salary $/Month"
        ></TextInputField>
        <TextAreaField formControl={form.control} name="notes" placeholder="Notes" />
        <SelectField formControl={form.control} name="status" label="Status *">
          <SelectItem value="applied">Applied</SelectItem>
          <SelectItem value="scheduledInterview">Scheduled Interview</SelectItem>
          <SelectItem value="interviewed">Interviewed</SelectItem>
          <SelectItem value="offered">Offered</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
        </SelectField>
        <DateField
          formControl={form.control}
          name="applicationDate"
          label="Application Date"
          reset={() => {
            form.resetField('applicationDate', {
              defaultValue: null,
            });
          }}
        />
        <DateField
          formControl={form.control}
          name="interviewDate"
          label="Interview Date"
          reset={() => {
            form.resetField('interviewDate');
          }}
        />
        <DateField
          formControl={form.control}
          name="rejectionDate"
          label="Rejection Date"
          reset={() => {
            form.resetField('rejectionDate');
          }}
        />
        <DateField
          formControl={form.control}
          name="offerDate"
          label="Offer Date"
          reset={() => {
            form.resetField('offerDate');
          }}
        />
        <DateField
          formControl={form.control}
          name="acceptanceDate"
          label="Acceptance Date"
          reset={() => {
            form.resetField('acceptanceDate');
          }}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting || form.formState.isLoading || !form.formState.isValid}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
