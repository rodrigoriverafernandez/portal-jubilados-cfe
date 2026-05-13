export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
      <section className="mb-14 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-16 text-white shadow-2xl shadow-slate-950/40 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-5xl space-y-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-200">Atención a jubilados</p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Contacto y atención a jubilados
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">
            Estamos aquí para apoyarte en trámites, documentación y servicios exclusivos para la comunidad jubilada de la CFE.
          </p>
        </div>
      </section>

      <section className="mb-16 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
            <div className="mb-6 flex flex-col gap-6 rounded-3xl bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Contacto directo</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">Hablemos hoy</h2>
              </div>
              <div className="rounded-3xl bg-blue-950 px-5 py-4 text-white shadow-lg shadow-blue-950/20">
                <p className="text-sm uppercase tracking-[0.24em] text-blue-100">Horario</p>
                <p className="mt-2 text-lg font-semibold">Lun a Vie 9:00 - 18:00</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Teléfono</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">800-123-4567</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Correo</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">jubilados@cfe.mx</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Dirección</p>
                <p className="mt-3 text-base font-semibold text-slate-900 leading-7">Av. Institucional 123, Ciudad de México</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Atención</p>
                <p className="mt-3 text-base font-semibold text-slate-900 leading-7">Presencial y telefónica para jubilados</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-900">¿Necesitas apoyo?</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">¿Necesitas apoyo con trámites o documentación?</h2>
              <p className="mt-4 text-slate-600 leading-7">
                Nuestro equipo especializado te acompaña en los procesos para solicitar beneficios, aclarar dudas y agilizar tus gestiones como jubilado.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Trámites</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">Apoyo en solicitudes</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Documentación</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">Asesoría paso a paso</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Beneficios</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">Guía especializada</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-900">Formulario de contacto</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Escríbenos tu mensaje</h2>
          </div>

          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                placeholder="Nombre completo"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                Correo
              </label>
              <input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-slate-700">
                Asunto
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Asunto de la consulta"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Cuéntanos en qué podemos ayudarte"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-full bg-blue-950 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-900"
            >
              Enviar mensaje
            </button>
          </form>
        </aside>
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.75fr_1fr]">
        <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="rounded-3xl bg-slate-50 p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-900">Mapa de atención</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">Visítanos en Ciudad de México</h2>
            <p className="mt-4 text-slate-600 leading-7">
              Nuestra oficina de atención para jubilados está ubicada en un espacio accesible y seguro, con atención personalizada para cada trámite.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-inner">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.1786746837433!2d-99.1332!3d19.4326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff2c4cfbd285%3A0x1234567890abcdef!2sCiudad%20de%20M%C3%A9xico!5e0!3m2!1ses-419!2smx!4v0000000000000"
              className="h-96 w-full border-0"
              loading="lazy"
              title="Mapa de ubicación"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-900">Redes sociales</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">Conéctate con nosotros</h2>
            <p className="mt-4 text-slate-600 leading-7">
              Síguenos para recibir avisos, actualizaciones y contenidos exclusivos dirigidos a nuestros jubilados.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-900 text-white">
                <span className="text-lg font-bold">f</span>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Facebook</p>
                <p className="mt-1 text-base font-semibold text-slate-900">Portal Jubilados CFE</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <span className="text-lg font-bold">X</span>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">X / Twitter</p>
                <p className="mt-1 text-base font-semibold text-slate-900">@CFEJubilados</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 text-white">
                <span className="text-lg font-bold">▶</span>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">YouTube</p>
                <p className="mt-1 text-base font-semibold text-slate-900">Canal Jubilados CFE</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
