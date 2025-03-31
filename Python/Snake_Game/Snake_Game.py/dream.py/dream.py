import datetime

archivo = "registro_sueno.txt"

def registrar_sueno():
    hora_dormir = input("¿A qué hora te dormiste? (Formato HH:MM, 24h): ")
    hora_levantar = input("¿A qué hora te despertaste? (Formato HH:MM, 24h): ")
    calidad = input("¿Cómo dormiste? (1-10): ")

    with open(archivo, "a", encoding="utf-8") as f:
        f.write(f"{datetime.date.today()}, {hora_dormir}, {hora_levantar}, {calidad}\n")

    print("Registro guardado.")

def ver_registros():
    try:
        with open(archivo, "r", encoding="utf-8") as f:
            contenido = f.read()
            if contenido.strip():
                print("\nHistorial de sueño:\n")
                print(contenido)
            else:
                print("No hay registros aún.")
    except FileNotFoundError:
        print("No hay registros aún.")

def borrar_historial():
    with open(archivo, "w", encoding="utf-8") as f:
        pass
    print("Historial borrado.")

# Ejemplo de uso
#registrar_sueno()
#ver_registros()
# Para borrar el historial, descomenta la línea siguiente:
#borrar_historial()
