import { ContactForm } from "../components/contact"
import Head from "next/head"

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact me</title>
        <met name="description" content="Sned me your messages" />
      </Head>
      <ContactForm />
    </>
  )
}

export default Contact